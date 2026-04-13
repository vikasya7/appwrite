import conf from "@/conf/config";
import { Client,Account,ID } from "appwrite";


type CreateUserAccount={
   email:string,
   password:string,
   name:string
}

type LoginUserAccount = {
    email:string,
   password:string,
} 


const appwriteClient=new Client()

appwriteClient.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)


export const account=new Account(appwriteClient)

export class AppwriteService {
    // create a new record of user inside appwrite
    async createUserAccount({email,password,name}:CreateUserAccount){
        try {
            const userAccount=await account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}:LoginUserAccount){
        try {
            return await account.createEmailPasswordSession({
               email,
               password
            });
        } catch (error) {
            throw error
        }
    }
    async isLoggedIn():Promise<boolean>{
        try {
           const data= await this.getCurrentUser()
           return Boolean(data)
        } catch (error) {
            throw error
        }
       return false;
    }
    async getCurrentUser(){
        try {
            return account.get()
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            return await account.deleteSession("current")
        } catch (error:unknown) {
            const message=error instanceof Error ? error.message : "Internal server error"
            console.log("logout error",message)
        }
    }
}

const appwriteService=new AppwriteService()

export default appwriteService
