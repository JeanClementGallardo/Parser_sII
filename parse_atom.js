const cutATOM = (accu,line) => {
    let cuts = [
        {
            start : 7,
            end : 11,
            field : 'serial',
            type : 'float'
        },
        {
            start : 13,
            end : 16,
            field : 'name',
            type : 'Atom'
        },
        {
            start : 17,
            end : 17,
            field : 'altLoc',
            type : 'Character'
        },
        {
            start : 18,
            end : 20,
            field : 'resName',
            type : 'Residue name'
        },
        {
            start : 22,
            end : 22,
            field : 'chainID',
            type : 'Character'
        },
        {
            start : 23,
            end : 26,
            field : 'resSeq',
            type : 'float'
        },
        {
            start : 27,
            end : 27,
            field : 'iCode',
            type : 'AChar'
        },
        {
            start : 31,
            end : 38,
            field : 'x',
            type : 'float'
        },
        {
            start : 39,
            end : 46,
            field : 'y',
            type : 'float'
        },
        {
            start : 47,
            end : 54,
            field : 'z',
            type : 'float'
        },
        {
            start : 55,
            end : 60,
            field : 'occupancy',
            type : 'float'
        },
        {
            start : 61,
            end : 66,
            field : 'tempFactor',
            type : 'float'
        }
    ];
    let obj = cuts.map( (cut) => line.substring(cut.start-1,cut.end)); // pas mal mais pas assez complique pour lui
    let obj3 = cuts.reduce( (accu,cut) =>
        {
            let token = line.substring(cut.start-1,cut.end);
            accu[cut.field] =(cut.type === 'float') ? parseFloat(token) : token;
            return accu;
        }
    ) ;


};

const parseLine = (accu,line,idx) => {
    let key = line.substring(0,6).trim(); // substring decoupe
    // console.log(key); // recupere la premiere colonne
    if (key === 'HEADER') {
        cutHEADER(accu,line);
    }
    else if ( key === 'ATOM') {
        cutATOM(accu, line);
    }
}

const parsePDB = (text) => {
    let lines = text.split('\n');
    let s3d = lines.reduce(
        parseLine,
        {
            herder: {},
            atoms:[]
        }
    );
}
