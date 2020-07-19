


async function getPosts() {


    //let carLicensePlate = 91849601

    let carLicensePlate = document.getElementById("licenseplateBox temperature").value;
    carLicensePlate = carLicensePlate.toString().replace(/\D/g,'');
    alert (carLicensePlate)

    carLicensePlate = parseFloat(carLicensePlate);
    


    //fetching data from gov.il
    let postsPromise = await fetch(`https://data.gov.il/api/3/action/datastore_search?q=${carLicensePlate}&resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e`);
    let obj = await postsPromise.json(); 
    let serachKey = obj && obj.result && obj.result.records && obj.result.records.length 
    ? obj.result.records.map(data => data) : []; 
    
    let carLicensePlateResult = JSON.stringify(serachKey);
  
    let isHandicaptedCarBoolean = carLicensePlateResult.includes(carLicensePlate);


    //true modal
    if(isHandicaptedCarBoolean === true){
        document.body.style.backgroundColor = "green";

    }

    //false modal
    if(isHandicaptedCarBoolean === false){
        document.body.style.backgroundColor = "red";

    }



    document.getElementById('licenseplateBox temperature').value = "";


    document.getElementById("licenseplateBox temperature").focus();

                                                }




     