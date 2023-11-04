import {PrismaClient} from '@prisma/client'
import { Request ,Response,NextFunction} from 'express';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import {hash } from 'bcrypt';


const prisma=new PrismaClient()


export const login=catchAsync(async (req:Request,res:Response,_next: NextFunction)=>{
    const {email_or_username,password}=req.body;
    const hashedPassword = await hash(password,process.env.SALT);
    let user=null;

    if(email_or_username.includes('@')){
        const userEmail=await prisma.user.findUnique({
            where: {
                email:email_or_username,
                password:hashedPassword
            }
        }).catch()
        user=userEmail
    }
    else{
    const userUsername=await prisma.user.findUnique({
            where: {
                userName:email_or_username,
                password:hashedPassword
            }
        }).catch()
        user=userUsername
    }
    
    if(!user)
    {
        res.status(200).json({msg:"wrong password"})
        return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.status(200).json({token:token,user})
},);


