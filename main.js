const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
    }

    mineBlock(difficuty){
        while(this.hash.substr(0, difficuty) !== Array(difficuty + 1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash();
        }
        console.log("Hash: ", this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficuty = 5;
    }

    createGenesisBlock(){
        return new Block(0, "14/10/2018", "Joseph Pravin", 0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficuty);
        this.chain.push(newBlock);
    }

    isValid(){
        for(let i = 1; i< this.chain.length; i++){
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if(currBlock.previousHash !== prevBlock.hash){
                  return false;
            }
        }
        return true;
    }
}

let bitcoin = new BlockChain();

bitcoin.addBlock(new Block(1, "12/11/2018", { amount: 100 }));
bitcoin.addBlock(new Block(2, "21/12/2018", { amount: 900 }));

//console.log(JSON.stringify(bitcoin, null, 4));