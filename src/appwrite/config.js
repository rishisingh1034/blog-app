import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("66ccb78900153e0bb7eb");
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                "66ccb8520038696a9f38",
                "66ccb87c00110c7c84c9",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                "66ccb8520038696a9f38",
                "66ccb87c00110c7c84c9",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                "66ccb8520038696a9f38",
                "66ccb87c00110c7c84c9",
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                "66ccb8520038696a9f38",
                "66ccb87c00110c7c84c9",
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries= [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                "66ccb8520038696a9f38",
                "66ccb87c00110c7c84c9",
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error);
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                "66ccba19003a6a944ee7",
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFiles :: error",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                "66ccba19003a6a944ee7",
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFiles :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            "66ccba19003a6a944ee7",
            fileId
        )
    }
}

const service = new Service();

export default service;