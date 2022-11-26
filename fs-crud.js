const fs= require("fs");
const http= require("http");
const PORT = 8897;
// const fileChange = (data)=>{
//     fs.readFile('fs_crud.html', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'}) ;
//         res.write(data);
//         res.end(data);
//       }); 
// }
const server= http.createServer((req,res)=>{
    if(req.url=="/"){
        //read html file
        fs.readFile('fs_crud.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'}) ;
            res.write(data);
            res.end();
          }); 
    }//create file
    else if(req.url=="/create"){
        //file already exits
        if(fs.existsSync("neosoft.txt")){
            fs.readFile('fs_crud.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end(`<html><body><center>Already exists</center></body></html>`);
               
              });
           
        }//when file is not exits
        else{
            fs.writeFile('neosoft.txt',"welcome to neosoft!", (err)=>{
                if(err) throw err
                else 
                {
                    fs.readFile('fs_crud.html', function(err, data) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(data);
                        res.end(`<html><body><center>File Created</center></body></html>`);
                       
                      });

                }
            })
        }
    }//read file content
    else if(req.url=="/read"){
        if(fs.existsSync("neosoft.txt")){
            let data=fs.readFileSync("neosoft.txt");
            let t=data.toString();
            fs.readFile('fs_crud.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end(`<html><body><center>${t}</center></body></html>`);
              
              });
        }
        else{
            fs.readFile('fs_crud.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end(`<html><body><center>File does not exits</center></body></html>`);
             
              });   
        }
    }//file delete part
    else if(req.url=="/delete"){
        if(fs.existsSync("neosoft.txt")){
            if(fs.existsSync("neosoft.txt")){
                fs.unlink("neosoft.txt",(err)=>{
                    if (err) throw err
                    else {
                        
                        fs.readFile('fs_crud.html', function(err, data) {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write(data);
                            res.end(`<html><body><center>File deleted</center></body></html>`);
                           
                          });    

                    };
                });
            }
        }
        else{
            fs.readFile('fs_crud.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end(`<html><body><center>File does not exits</center></body></html>`);
           
              });
        }

    }//file updated part
    else if(req.url=="/append"){
        if(fs.existsSync("neosoft.txt")){

            fs.existsSync("neosoft.txt")
                fs.appendFile("neosoft.txt","Data Added!",(err)=>{
                    if (err) throw err
                else {
                    fs.readFile('fs_crud.html', function(err, data) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(data);
                        res.end(`<html><body><center>data updated</center></body></html>`);
                        
                      });
   
                }
                });
            
        }
        else{

            fs.readFile('fs_crud.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end(`<html><body><center>File does not exits</center></body></html>`);
              
              });
            
        }

    }
    else{
        res.end("Invalid Request");
    }
})
server.listen(PORT,(err)=>{
    if(err) throw err
    else{
        console.log(`server work on ${PORT}`)
    }
})
console.log("program End")