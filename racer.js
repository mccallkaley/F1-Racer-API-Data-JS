// make the input field for a season and round use input element plave holder is the text


addErgastSeason();
addErgastRound();
addSubmitButton();
createErgastTable();

// element by season and round 
// want form control class to take up width of containter classList (ALL OF THEM)
// need to create something then ATTATCH IT TO PAGE FOR IT TO SHOW UP
// YOU DO THIS BY MAKING IR RELATIVE TO SOMETHING ON PAGE SO BODY IN THIS CASE
// document.body.appendChild()
// you could do document.getElementbyID("table").appendChild() for ex for something else



function addErgastSeason(){
    input=document.createElement("input");
    input.placeholder = "Enter Season";
    input.name = "Season";
    input.classList.add("form-control");
    document.body.appendChild(input);
}

function addErgastRound(){
    input=document.createElement("input")
}

function addErgastRound(){
    input=document.createElement("input");
    input.placeholder = "Enter Round";
    input.name = "Round";
    input.classList.add("form-control");
    document.body.appendChild(input);
}
//index into 0 position to the one we created 
//use html prop .value ---Season and round is = box that whats inside input field round and season
// pass it to another func do APICall whatever season and round for their racers
function handleSubmit(){
    season=document.getElementsByName("Season")[0].value
    console.log(season)
    round = document.getElementsByName("Round")[0].value
    console.log(round)
    doAPICall(season, round)
}

// make a submit button
//add inner text of search
// give some bootstrap classes with classList to add multiple classes at once you
// do 'btn', other class
//take button look for a click and name of func that handles button clicking (handle)
// append to the body 
// needed handle submit func above we added so it can ref
//ORDER MATTERS

function addSubmitButton(){
    button=document.createElement('button');
    button.innerText="Submit";
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click',()=>handleSubmit());
    document.body.appendChild(button);

}
//NEED A TABLE FOR RACERS INFO
// CREAte table element
// give classes (bootstrap since we linked it)
// make each row we will be adding racers  to body later 
// thead is titles 
//append to document table (adding the head to thead)
// make createtable header func right above it
// make th with scope  of column and inner text which is param (lable)
// append th to your tr
// create tbody

function createTableHeaderEntry(label){
    th = document.createElement("th");
    th.innerText = label;
    th.scope = "col"
    tr.appendChild(th)

}

function createErgastTable(){
    table = document.createElement("table");
    table.classList.add("table","table-striped")
    document.body.appendChild(table)

    thead = document.createElement("thead");
    table.appendChild(thead);

    tr = document.createElement("tr");
    thead.appendChild(tr);


    createTableHeaderEntry("First Name");
    createTableHeaderEntry("Last Name");
    createTableHeaderEntry("Position");
    createTableHeaderEntry("Wins");
    createTableHeaderEntry("DOB");
    createTableHeaderEntry("Nationality");
    createTableHeaderEntry("Constructor");

    
    tbody = document.createElement("tbody");
    table.appendChild(tbody);

}

//build out func for API func refer to handle sumbit to know what to pass into
//do request async await way
// result = (this is where you do api call) axios.get in the (URL)
//do catch to take in errors we call it e here then arrow func
// do promise wait for it to be done
// if you are waiting for something in func it needs to be await 
// save data back to result.data
// ANY API CALL IS PROMISE
// result = result.data and other info is basically getting into the json file 
// add these to the table in the tBODY
// in hw you get list of drivers back you will have to loop thriugh driver with new
// t row 
// getElementsByTagName RETURNS A LIST
// make table row tr
// attatch th to tr 
//<tr> table row</tr> <td>table data in row</td>


async function doAPICall(season, round){
    result = await axios.get(`http://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
                                .catch((e)=>{console.log(e);alert("Error! Info not found!")})
                                    .finally(console.log("Api request over"))

    if(!result){return}
    console.log(result)
    console.log(result.data)

    results=result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    for (result of results){ 


    tbody=document.getElementsByTagName('tbody')[0];

    tr = document.createElement("tr");
    tbody.appendChild(tr);

    td = document.createElement('td');
    td.innerText=result.Driver.givenName;
    tr.appendChild(td);     //attatch to row

    td = document.createElement('td');
    td.innerText=result.Driver.familyName;
    tr.appendChild(td);      //attatch to row

    td = document.createElement('td');
    td.innerText=result.position;
    tr.appendChild(td);     //attatch to row

    td = document.createElement('td');
    td.innerText=result.wins;
    tr.appendChild(td);     //attatch to row

    td = document.createElement('td');
    td.innerText=result.Driver.dateOfBirth;
    tr.appendChild(td);       //attatch to row

    td = document.createElement('td');
    td.innerText=result.Driver.nationality;
    tr.appendChild(td);    //attatch to row

    td = document.createElement('td');
    td.innerText=result.Constructors[0].name;
    tr.appendChild(td);     //attatch to row


    }
}