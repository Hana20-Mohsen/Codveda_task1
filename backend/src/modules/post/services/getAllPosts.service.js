import fs from 'fs';
import path from 'path';

const getAllPosts= (req , res , next)=>{
    try {
        const postsFilePath=path.resolve('./src/models/posts.model.json');
        if(!fs.existsSync(postsFilePath)){
            return res.status(404).json({status:'fail' , message:'posts not found'})
        }
        const postsData = fs.readFileSync(postsFilePath, 'utf-8');
        if(!postsData){
            return res.status(404).json({status:'fail' , message:'no posts found'})
        }
        const posts = JSON.parse(postsData);
        return res.status(200).json({status:'success' , message:'posts retrieved successfully' , posts});
        
    } catch (error) {
        return res.status(500).json({status:'fail' , message:'server error' , error:error.message})
    }
}

export default getAllPosts;