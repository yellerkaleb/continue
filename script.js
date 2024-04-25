//web template html code for web page generated
const mcHtmlTemplate=`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <title>###TITLE###</title>
            </head>
            <body>
                <h1>###H1TITLE###</h1>
                <label for="topic">###TOPIC###</label>
                <div id="website">###BODY###</div>
                <button onclick="loadRandomPage();">Next Page</button>
            </body>
        </html>       
    `;

//js template code for js file. although, to avoid getting Virus warnings, it is integrated into the html page itself
const mcJsTemplate=`
        function loadRandomPage() {
            const currentPage = window.location.pathname.split('/').pop();
            const pages = ['about.htm', 'index.htm', 'contact.htm'];
            let randomPage;
        
            do {
            randomPage = pages[Math.floor(Math.random() * pages.length)];
            } while (randomPage === currentPage);
        
            window.location.href = randomPage;
        }
    `;
//css template code for css file
const mcCssTemplate=`
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            margin: 10px;
        }
        input[type="text"] {
            padding: 5px 10px;
            font-size: 16px;
        }

        textarea {
            width: 300px;
            height: 100px;
        }
        #website {
            margin-top: 20px;
        }
    `;

//generate web site from templates, include all html, css and js files
function createWebsite() {
    const cHtml=mcHtmlTemplate.replace('###TOPIC###',"More info about " + eID('topic').value) 
                + "<script>" 
                + mcJsTemplate + "</script>"
            ;


    //saveFile('basic.js', mcJsTemplate);

    saveFile('index.htm', cHtml
                    .replace('###TITLE###',"Home")
                    .replace('###H1TITLE###',"Home - " + eID('topic').value)
                    .replace('###BODY###',genRndText(20, 20, 50))

                );
    
    saveFile('about.htm', cHtml
                    .replace('###TITLE###',"About")
                    .replace('###H1TITLE###',"About - " + eID('topic').value)
                    .replace('###BODY###',genRndText(20, 20, 50))
                );
    
    saveFile('contact.htm', cHtml
                    .replace('###TITLE###',"Contact")
                    .replace('###H1TITLE###',"Contact - " + eID('topic').value)
                    .replace('###BODY###',genRndText(20, 20, 50))
                );

    saveFile('style.css', mcCssTemplate);

    eID('website').innerHTML = "Web site created. \nUpload docs to webserver to preview";//websiteContent;
}

function saveFile(fileName, fileContent) {
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const downloadLink = document.createElement('a');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
}    


//abbrev of calls to document.getElementById //accepts object or string
function eID(id) {
    if (typeof id === 'string') {
        if (id.charAt(0) === '#') id=id.substring(1);
        return document.getElementById(id);
    } else if (id instanceof HTMLElement) {
        return id;
    } else {
        return null;
    }
}

//generate random text to mimic content. 
function genRndText(numParagraphs, minWords, maxWords) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const paragraphs = [];

    for (let i = 0; i < numParagraphs; i++) {
        let paragraph = '';
        const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    
        for (let j = 0; j < numWords; j++) {
        const wordLength = Math.floor(Math.random() * 9) + 2; // Word length between 2 and 10 characters
        let word = '';
    
        for (let k = 0; k < wordLength; k++) {
            word += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        paragraph += word + ' ';
        }
    
        paragraphs.push(paragraph.trim());
    }
    
    return paragraphs;
}
        

  
/*<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
function compressFiles() {
    const fileInput = eID('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
      alert('Please select at least one file to compress.');
      return;
    }

    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      zip.file(file.name, file);
    }

    zip.generateAsync({ type: 'blob' })
      .then(function(content) {
        const zipFileName = 'compressed.zip';
        saveAs(content, zipFileName);
      })
      .catch(function(err) {
        console.error('Error compressing files:', err);
      });
  }
*/