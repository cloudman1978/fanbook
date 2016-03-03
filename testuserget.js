token="CAACEdEose0cBAMlZCgL6VhjizONY7ZAa8K562efCqb3el0F7IMAK6hQVEuVowNgZAZAVZCUZCPOXHG3P2fV0Cq9Me78v0VQqOejGbqISoy8uZA4MliJwLBVN6ZCJZBGVMAtdZArhlTo2payeLDUExgQ5LcKeOzPGzd3kZCpfRLsEQQ9N2AT57zqa4EEGcg2gZC3piU5rcbJf8LkWEgZDZD";
//token="CAAVLI8Q1KXsBAG9nBBBDkiYZAEMaXKSrWhJFGJMQiPNUPLZBanZA12BZCu0ZCVHlMGBv964erBfzCZCaSFGTkZAIuOxEM8nr3bv5NN5LBNZCuaGulgZCF96vC7zwDrovuDosn2M5Hfi3BN0VdeiBKRdNVoMj6sXpsfxKd2f9YG65cOSojgDhdzY0dazh7cP3k2u2ioj33bSegFKP5ZAEqV9p8T";
var graph = require('fbgraph');
graph.setAccessToken(token);

                    graph.get("/993902677315150", function(err, res) {
                    if (err){
                        console.log("probleme de connexion");
                        console.log(err);
                    }else{
                        console.log (res);

                    }
                });