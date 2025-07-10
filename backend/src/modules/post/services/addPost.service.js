import fs from 'fs';
import path from 'path';

const addPost=async(req , res , next)=>{
    try {
        const {title , content , privacy} = req.body;
        console.log({title , content , privacy});
        if(!title || !content || !privacy){
            return res.status(400).json({status:'error' , message:'all fields are required'})
        }
        const post = {
            id: Date.now(),
            title,
            content,
            privacy,
            createdAt: new Date().toISOString()
        };
        const postsFilePath= path.resolve('./src/models/posts.model.json');
        const postsData = fs.readFileSync(postsFilePath, 'utf-8');
        console.log('postsData : ' , postsData);
        let posts = [];
        if(postsData){
            posts= JSON.parse(postsData)
        }
        posts.push(post);
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
        return res.status(201).json({status:'success' , message:'post added successfully' , post});
        
        
    } catch (error) {
        return res.status(500).json({status:'error' , message:'server error' , error: error.message})
    }
}

export default addPost;