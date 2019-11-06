/*
 * Parse file PDB Format
 *
 * 18 october 2019
 * GALLARDO Jean-Clément
 */

//Function

const getContents = (ev) => {
    let f = ev.target.files[0];

// read file

    let reader = new FileReader();
    reader.onload = (e) => {
        let text = reader.result;
        parsePDB(text);
    }
    reader.readAsText(f);
}


// Add event addEventListener

let pdbBrowse = document.querySelector('#pdb');
pdbBrowse.addEventListener('change',getContents);
