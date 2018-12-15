var prompt = process.argv[2];
var input = process.argv.slice(3).join(" ");

console.log("prompt before " + prompt);
console.log("input before " + input);

const movieNobody = "Mr Nobody";

// do-what-it-says
if (prompt === "do-what-it-says") {
    
        var dataArray = input.split(",");
        prompt = "yes";
        input = dataArray[0];
        console.log(dataArray)
    }

console.log("prompt after " + prompt);
console.log("input after " + input);
