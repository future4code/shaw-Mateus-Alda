import { BaseDatabase } from "../BaseDatabase";
import users from "./users.json"
import posts from "./posts.json"
import post_like from "./post_like.json"
import post_comment from "./post_comment.json"


class Migrations extends BaseDatabase {
    createTables = async () => {
        try {
            await this.connection.raw(`

                CREATE TABLE IF NOT EXISTS labook_users(
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    friends JSON NOT NULL
                );
        
                CREATE TABLE IF NOT EXISTS labook_posts(
                    id VARCHAR(255) PRIMARY KEY,
                    image VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    type ENUM("normal","event") DEFAULT "normal",
                    created_at DATETIME NOT NULL,
                    total_likes INT DEFAULT 0,
                    user_id VARCHAR(255),
                    FOREIGN KEY (user_id) REFERENCES labook_users (id)
                );
        
                create table if not exists labook_post_like(
                    post_id varchar(255) not null,
                    user_id varchar(255) not null,
                    foreign key (post_id) references labook_posts(id),
                    foreign key (user_id) references labook_users(id)
                );
        
                create table if not exists labook_post_comment(
                    id varchar(255) primary key,
                    comment varchar(255) not null,
                    post_id varchar(255) not null,
                    user_id varchar(255) not null,
                    foreign key (post_id) references labook_posts(id),
                    foreign key (user_id) references labook_users(id)
                );

            `)
                .then(() => { console.log("Tables created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        } finally {
            this.connection.destroy()
        }
    }

    insertUsers = async () => {
        try {
            await this.connection('labook_users')
                .insert(users)
                .then(() => { console.log("Users created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        } finally {
            this.connection.destroy()
        }
    }

    insertPosts = async () => {
        try {
            await this.connection('labook_posts')
                .insert(posts)
                .then(() => { console.log("Posts created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        } finally {
            this.connection.destroy()
        }
    }

    insertPostLikes = async () => {
        try {
            await this.connection('labook_post_like')
                .insert(post_like)
                .then(() => { console.log("Post likes created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        } finally {
            this.connection.destroy()
        }
    }

    insertPostComments = async () => {
        try {
            await this.connection('labook_post_comment')
                .insert(post_comment)
                .then(() => { console.log("Post comments created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        }
    }

    closeConnection = async () => {
        this.connection.destroy()
    }
}

const migrations = new Migrations()
migrations.createTables()
.then(migrations.insertUsers)
.then(migrations.insertPosts)
.then(migrations.insertPostLikes)
.then(migrations.insertPostComments)
.then(migrations.closeConnection)