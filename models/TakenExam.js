const mongoose = require ("mongoose");

const TakenExamSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            require:true
        },
        examId:{
            type:String,
            require:true
        },
        score:{
            type:String,
            require:true
        },
        date:{
            type:String,
            require:true
        }
    }
)
const TakenExam = mongoose.model("TakenExam",TakenExamSchema);
module.exports= TakenExam
