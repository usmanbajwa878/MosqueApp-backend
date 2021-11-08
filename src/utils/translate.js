const translate = require('translate');

const translateString = async (str,langauge) =>{
    translate.engine = 'libre';
    try {
        const data =  await translate(str,langauge);
        console.log(data,"TRANSLTED")
    } catch (error) {
        console.log("ERROR",error)
    }
  
    return data;
}
exports.translateObject = async(item,language) => {
    Object.keys(item).map(async function(key, index) {
        item[key] =  await translateString(item[key],language)
      });
      
      console.log(item);
}
