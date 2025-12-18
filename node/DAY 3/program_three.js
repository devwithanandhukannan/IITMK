import read from 'readline'
const input = read.createInterface({
    input: process.stdin,
    output: process.stdout
})

// input.question('What is your name: ',(name)=>{
//     console.log(`Hello, ${name}`);
//     input.close();
// })

input.question("Enter first number: ",(num1)=>{
    input.question("Enter second number: ",(num2)=>{
        console.log(Number(num1)+Number(num2));
        input.close();
    })

})