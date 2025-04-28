const mongoose=require('mongoose')
const jobSchema=mongoose.Schema({
    title:{
        type:String,
      
    },
    companyName:{
        type:String,
      
    },
    description:{
        type:String,
       
    },
   
    type:[String],// befristet , unbefristet
    work:[String],// teilzeit, Vollzeit
    workingdays:[String],
    salary: {
        type: {
          type: String,
          enum: ['monthly', 'hourly'],
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        }
      },
    location:{
        type:String,

    },
    adresse:{
         city:{
            type:String

        },
        street:{
            type:String
        },
        housNumber:{
            type:String
        }
    },

    skills:[String],//Fähigkeiten
    languages:[String],
    tasks:[String], //Aufgaben
    performances:[String],//Leistungen
    likes:[
        {
            userId:{
                type:String,
                required:true,
            },
            dateLiked:{
                type:Date,
                default:Date.now
            }
        }
    ],
    imageUrl:{
      type:String

   },
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    

},{ timestamps: true })
module.exports=mongoose.model('Job',jobSchema)