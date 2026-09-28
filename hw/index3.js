class MyString extends String {
    countChar(char){
        let count = 0;
        for(let i = 0; i < this.length; i++){
            if(this[i] === char){
                count++;
            }
        }
        return count;
    }
}

const myString = new MyString("Hello World");
console.log(myString.countChar("l"));
