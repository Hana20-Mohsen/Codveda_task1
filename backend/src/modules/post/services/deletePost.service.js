import fs from 'fs';
import path from 'path';

const deletePost= (req , res , next)=>{
    try {
        const {id}=req.params;
        const postsFilePath= path.resolve('./src/models/posts.model.json');
        if(!fs.existsSync(postsFilePath)){
            return res.status(404).json({status:'fail' , message:'posts not found'})
        }
        const postsData= fs.readFileSync(postsFilePath , 'utf-8');
        if(!postsData){
            res.status(404).json({status:'fail' , message:'no posts found'})
        }
        let posts= JSON.parse(postsData);
        const postIndex= posts.findIndex(post=>post.id===parseInt(id));
        if(postIndex===-1){
            return res.status(404).json({status:'fail' , message:'post not found'})
        }
        posts.splice(postIndex , 1);
        fs.writeFileSync(postsFilePath , JSON.stringify(posts, null, 2));
        return res.status(200).json({status:'success' , message:'post deleted successfully'});
        
    } catch (error) {
        return res.status(500).json({status:'fail' , message:'server error' , error:error.message})
    }
}

export default deletePost;