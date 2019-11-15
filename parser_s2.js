/*
 * Parse PDB file for HELIX and SHEET indexes
 *
 * October 2019
 *
 * Jean-Clément GALLARDO
 * Jérémy BULLE
 * Elsa CLAUDE
 */

 // TODO : associer a chaque résidu (via les CA) l'identifiant de la formation auquel il appartient : par exemple helix 1, sheet 2 + (paralelle - antipara)

 const cutATOM = (accu,line) => {
    const cuts = [
      {start:7,end:11,name:'serial',type:'int'},
      {start:13,end:16,name:'name',type:'atom'},
      {start:17,end:17,name:'altLoc',type:'char'},
      {start:18,end:20,name:'resName',type:'ResidueName'},
      {start:22,end:22,name:'chainID',type:'char'},
      {start:23,end:26,name:'resSeq',type:'int'},
      {start:27,end:27,name:'iCode',type:'Achar'},
      {start:31,end:38,name:'x',type:'real'},
      {start:39,end:46,name:'y',type:'real'},
      {start:47,end:54,name:'z',type:'real'},
    ];
    let atom = cuts.reduce( (acc,cut) => {
      if (cut.type==='real' || cut.type==='int'){
        acc[cut.name] = parseFloat(line.substring(cut.start-1,cut.end).trim());
      }
      else {
        acc[cut.name] = line.substring(cut.start-1,cut.end).trim();
      }
      return acc;
    },
    {});
    atom["sII"] = "";
    accu.atom.push(atom);
    return accu;
  };

const cutHELIX = (accu,line) => {
    let cuts = [
        {
            start : 8,
            end : 10,
            field : 'Serial number of helix',
            type : 'integer'
        },
        {
            start : 12,
            end : 14,
            field : 'Helix identifier',
            type : 'string'
        },
        {
            start : 16,
            end : 18,
            field : 'Name of initial residue',
            type : 'Residue name'
        },
        {
            start : 20,
            end : 20,
            field : 'Chain identifier - Chain init with helix',
            type : 'character'
        },
        {
            start : 22,
            end : 25,
            field : 'Sequence number of the initial residue',
            type : 'integer'
        },
        {
            start : 26,
            end : 26,
            field : 'Insertion code of the initial residue',
            type : 'AChar'
        },
        {
            start : 28,
            end : 30,
            field : 'Name of the terminal residue',
            type : 'Residue name'
        },
        {
            start : 32,
            end : 32,
            field : 'Chain identifier - Chain end with helix',
            type : 'character'
        },
        {
            start : 34,
            end : 37,
            field : 'Sequence number of the terminal residue',
            type : 'integer'
        },
        {
            start : 38,
            end : 38,
            field : 'Insertion code of the terminal residue',
            type : 'AChar'
        },
        {
            start : 39,
            end : 40,
            field : 'Helix class',
            type : 'integer'
        },
        {
            start : 72,
            end : 76,
            field : 'Helix length',
            type : 'integer'
        },
    ];
    let obj = cuts.reduce( (acc,cut) => {
      acc[cut.field] = line.substring(cut.start-1,cut.end).trim();
      return acc;
    },
    {});
    accu.helix.push(obj);
    return accu;
};

const cutSHEET = (accu,line) => {
    let cuts = [
        {
            start : 8,
            end : 10,
            field : 'Strand',
            type : 'integer'
        },
        {
            start : 12,
            end : 14,
            field : 'Sheet id',
            type : 'string'
        },
        {
            start : 15,
            end : 16,
            field : 'Strand Number',
            type : 'integer'
        },
        {
            start : 18,
            end : 20,
            field : 'Name initial Residue',
            type : 'Residue name'
        },
        {
            start : 22,
            end : 22,
            field : 'Chain id of initial Residue',
            type : 'character'
        },
        {
            start : 23,
            end : 26,
            field : 'Sequence position of initial residue',
            type : 'integer'
        },
        {
            start : 26,
            end : 27,
            field : 'Insertion code of initial residue',
            type : 'AChar'
        },
        {
            start : 29,
            end : 31,
            field : 'Terminal residue name',
            type : 'Residue name'
        },
        {
            start : 33,
            end : 33,
            field : 'Chain identifier of terminal residue',
            type : 'character'
        },
        {
            start : 34,
            end : 37,
            field : 'Sequence position of terminal residue',
            type : 'integer'
        },
        {
            start : 38,
            end : 38,
            field : 'Insertion code of terminal residue',
            type : 'AChar'
        },
        {
            start : 39,
            end : 40,
            field : 'Sense of strand',
            type : 'integer'
        },
        {
            start : 42,
            end : 45,
            field : 'Atom name in current strand',
            type : 'Atom'
        },
        {
            start : 46,
            end : 48,
            field : 'Residue name in current strand',
            type : 'Residue name'
        },
        {
            start : 50,
            end : 50,
            field : 'Chain identifier in current strand',
            type : 'character'
        },
        {
            start : 51,
            end : 54,
            field : 'Residue sequence number in current strand',
            type : 'integer'
        },
        {
            start : 55,
            end : 55,
            field : 'insertion code in current strand',
            type : 'AChar'
        },
        {
            start : 57,
            end : 60,
            field : 'Atom name in previous strand',
            type : 'atom'
        },
        {
            start : 61,
            end : 63,
            field : 'Residue name in previous strand',
            type : 'Residue name'
        },
        {
            start : 65,
            end : 65,
            field : 'Chain identifier in previous strand',
            type : 'character'
        },
        {
            start : 66,
            end : 69,
            field : 'residue sequence number in previous strand',
            type : 'integer'
        },
        {
            start : 70,
            end : 70,
            field : 'Insertion code in previous strand',
            type : 'AChar'
        }
    ];
    let obj = cuts.reduce( (acc,cut) => {
      acc[cut.field] = line.substring(cut.start-1,cut.end);
      return acc;
    },
    {});
    accu.sheet.push(obj);
    return accu;
};

const parseLine = (accu,line,i) => {
  let key = line.substring(0,6).trim();
  if (key === 'HELIX') {
    accu = cutHELIX(accu,line);
  }
  if (key ==='SHEET') {
    accu = cutSHEET(accu,line);
  }
  if (key === 'ATOM') {
    accu = cutATOM(accu, line);
  }
  return accu ;
};




const seq_pos = (accu, table) => {
  accu.id = table["Serial number of helix"];
  accu.start = table["Sequence number of the initial residue"];
  accu.stop = table["'Sequence number of the terminal residue'"];
}

const add_sII = (table) => {
  if (table.atom.name === "CA"){

  }

}

//display

const getAttrVal = (value) =>{
    let tab = Object.entries(value);
    tab.unshift("");
    return tab;
}


const toStringAttrval = (accu, val) =>{
    accu +=  val[0] + " : " + val[1] + " | ";
    return accu;
}

const displayHelix = (value) =>{
    let div = document.getElementById('Helix');
    let p = document.createElement('p');
    let text = document.createTextNode(value.reduce(toStringAttrval));
    p.appendChild(text);
    div.appendChild(p);
}

const displaySheet = (value) =>{
    let div = document.getElementById('Sheet');
    let p = document.createElement('p');
    let text = document.createTextNode(value.reduce(toStringAttrval));
    p.appendChild(text);
    div.appendChild(p);
}


const parsePDB = (text) => {
    let lines = text.split("\n");
    // let idxhelix = [];
    let s3D = lines.reduce(parseLine,{helix:[],sheet:[],atom:[]});
    console.log(s3D);

    

    const posHelix = (currentValue, index) =>{

        s3D.helix.map((currentHelix, indexHelix) =>{
            if(index+1 >= currentHelix['Sequence number of the initial residue'] && index+1 <= currentHelix['Sequence number of the terminal residue']){
                if(currentValue == undefined){
                    currentValue = "H" + currentHelix['Serial number of helix'] +"/";
                } else{
                    currentValue += "H" + currentHelix['Serial number of helix'] +"/";
                }
            }
            return currentValue; 
        });
        return currentValue;
    }

    // sens : 0 if first strand,1 if  parallel,and -1 if anti-parallel. "Sense of strand"

    const posSheet = (currentValue, index) =>{

        s3D.sheet.map((currentSheet, indexHelix) =>{
            if(index+1 >= currentSheet['Sequence position of initial residue'] && index+1 <= currentSheet['Sequence position of terminal residue']){
                if(currentValue == undefined){
                    currentValue = "S" + currentSheet['Strand'] + "," + currentSheet["Sense of strand"] + "/";
                } else{
                    currentValue += "S" + currentSheet['Strand'] + "," + currentSheet["Sense of strand"] + "/";
                }
            }
            return currentValue; 
        });
        return currentValue;
    }


    let posS2 = Array.apply(null, Array(Object.keys(s3D.atom).length));
    let posMod = posS2.map(posHelix);
    console.log(posMod);
    
    


    let helixInfo = s3D.helix.map(getAttrVal);
    let sheetInfo = s3D.sheet.map(getAttrVal);
    helixInfo.map(displayHelix);
    sheetInfo.map(displaySheet);
  
  };