const taskModel = require('../models/task.model')
exports.createtask = async(req,res)=>{
    const status = req.body.status
    if(!req.body.date){
        return res.status(200).json({
            success: false,
            message: 'Task Date Is Required'
        })
    }
    if(!req.body.status){
        return res.status(200).json({
            success: false,
            message: 'Task Status Is Required'
        })
    }
    if(!req.body.task  ){
        return res.status(200).json({
            success: false,
            message: 'Task Is Required'
        })
    }
    if(status.toLowerCase() !== 'completed' && status.toLowerCase() !== 'incomplete'){
        return res.status(200).json({
            success: false,
            message: 'Status can Either Completed or Incomplete'
        })
        
    }
    req.body.status = status.toLowerCase()
    try{
        const task = await taskModel.create(req.body)
        console.log(task)
        return res.status(200).json({
            success:true,
            message: 'Task Added Successfully'
        })

    }catch(err){
        console.log(err)
        return res.status(200).json({
            success: false,
            message:'Something Went Wrong'
        })
    }
   
}


exports.editTask = async(req,res,next)=>{
    if(!req.params.taskId){
        return res.status(200).json({
            success: false,
            message: 'Task Id Is Required'
        })
    }
    const task = await taskModel.findOne({
        _id: req.params.taskId
    });
    if(!task){
        return res.status(200).json({
            success: false,
            message: `Task Not Exist Having Id: ${req.params.taskId}`
        })
    }
    if(req.body.status){
        const status = req.body.status
        if(status.toLowerCase() !== 'completed' && status.toLowerCase() !== 'incomplete'){
            return res.status(200).json({
                success: false,
                message: 'Status can Either Completed or Incomplete'
            })
        }
        req.body.status = status.toLowerCase()
    }
    try{

        const update_task = await taskModel.updateOne( { _id: req.params.taskId },
            {
              $set: req.body
            },)
        return res.status(200).json({
            success: true,
            message: 'Task Updated Successfully'
        })

    }catch(err){
        return res.status(200).json({
            success: false,
            message: 'Something Went Wrong'
        })

    }
}


exports.deletetask =async(req,res,next)=>{
if(!req.params.taskId){
    return res.status(200).json({
        success: false,
        message: 'Task Id Is Required'
    })
}
const task = await taskModel.findOne({_id: req.params.taskId})
if(!task){
    return res.status(200).json({
        success: false,
        message: 'Task Not Exist'
    })
}
try{
    task.remove()
    return res.status(200).json({
        success: true,
        message: "Task Deleted Successfully"
    })
}catch(err){
    return res.status(200).json({
        success: false,
        message: 'Something Went Wrong'
    })
}

}


exports.getAllTask =async(req,res,next)=>{
    let Page = req.query.page
    let Limit = req.query.limit
    if(!req.query.page){
        Page = 1
    }
    if(!req.query.limit){
        Limit = 10
    }
  
    try{
        const page = parseInt(Page);
        const limit = parseInt(Limit);
      
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
      
        taskModel.find().skip(startIndex).limit(limit)
          .then(users => {
            if(users.length <=0){
                return res.json({
                    success: false,
                    message: 'Records Not Found'
                });
            }
            return res.json({
                success: true,
                tasks: users
            });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Something Went Wrong');
          });
        
    }catch(err){
        console.log(err)
        return res.status(200).json({
            success: false,
            message: 'Something Went Wrong'
        })
    }
    
    }


    exports.sortedTasks =async(req,res,next)=>{
        let Page = req.query.page
        let Limit = req.query.limit
        if(!req.query.page){
            Page = 1
        }
        if(!req.query.limit){
            Limit = 10
        }
        const page = parseInt(Page);
        const limit = parseInt(Limit);
      
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
      
        taskModel.find().sort({ date: 1 }).skip(startIndex).limit(limit)
  .then(posts => {
    if(posts.length <= 0){
        return res.status(200).json({
            success: false,
            message: 'Records Not Found'
        })
    }
    return res.status(200).json({
        success: true,
        sortedTasks:posts
    })
  })
  .catch(err => {
    console.error(err);
    return res.status(200).json({
        success: false,
        message: 'Something Went Wrong'
    })
  });
        
        
        }





