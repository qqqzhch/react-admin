var readline = require('readline');
var fs = require('fs');
var os = require('os');

var fReadName = './weisence.txt';
var fRead = fs.createReadStream(fReadName);

var objReadline = readline.createInterface({
	input: fRead,
// 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用
// 但文件末尾会多算一次index计数   sodino.com
//  output: fWrite,
//  terminal: true
});


var index = 1;
var data={}
objReadline.on('line', (line)=>{
 var list=line.split('\t')
data[list[0]]=list[1]
	console.log(list)
	});

objReadline.on('close', ()=>{
	console.log('readline close...');
  console.log(data);
  fs.writeFileSync('./sence.json',JSON.stringify(data));
});
