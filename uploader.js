// no react or anything
let state = {};

// state management
function updateState(newState) {
	state = { ...state, ...newState };
	console.log(state);
}

// event handlers
$("input").change(function(e) {
	let files = document.getElementsByTagName("input")[0].files;
	let filesArr = Array.from(files);
	updateState({ files: files, filesArr: filesArr });

	renderFileList();
});

$(".files").on("click", "li > i", function(e) {
	let key = $(this)
		.parent()
		.attr("key");
	let curArr = state.filesArr;
	curArr.splice(key, 1);
	updateState({ filesArr: curArr });
	renderFileList();
});

$("form").on("submit", function(e) {
	e.preventDefault();
	console.log(state);
	renderFileList();
    uploadFile();
});


function saveSvg(svgdoc, name) {
    var serializer = new XMLSerializer();
    var svgEl = serializer.serializeToString(svgdoc);
    var svgData = svgEl;
    var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


async function uploadFile() {
  

  
  
    for(var i=0;i<fileupload.files.length;i++){
        const reader = new FileReader();
        let fname;
        reader.onload = function (evt) {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(evt.target.result, 'image/svg+xml')
            if(svgDoc.querySelector('svg').getAttribute('width')==null){
                alert("You missed width in "+fname);
                return;
            };
            if(svgDoc.querySelector('svg').getAttribute('height')==null){
                alert("You missed height in "+fname);
                return;
            };
            svgDoc.querySelector('svg').setAttribute("viewBox","0 0 "+svgDoc.querySelector('svg').getAttribute('width')+" " +svgDoc.querySelector('svg').getAttribute('height'));
            
           
           
                
                    svgDoc.querySelector('svg').removeAttribute('fill');
                    
                    if(svgDoc.querySelectorAll('path').length!=undefined){
                        for(var i=0;i<svgDoc.querySelectorAll('path').length;i++){
                            svgDoc.querySelectorAll('path')[i].removeAttribute('fill');
                        }
                    }else{
                        svgDoc.querySelectorAll('path').removeAttribute("fill");
                    }
                    if(svgDoc.querySelectorAll('g').length!=undefined){
                        for(var i=0;i<svgDoc.querySelectorAll('g').length;i++){
                        svgDoc.querySelectorAll('g')[i].setAttribute("fill",'black');
                        }
                    }else{
                        svgDoc.querySelectorAll('g').setAttribute("fill",'black');
                    }
                    
                    
                
            
            
           
           
            saveSvg(svgDoc,fname );
    
        };
        fname=fileupload.files[i].name;
        reader.readAsText(fileupload.files[i]);
        
    }
     
  }
// render functions
function renderFileList() {
	let fileMap = state.filesArr.map((file, index) => {
		let suffix = "bytes";
		let size = file.size;
		if (size >= 1024 && size < 1024000) {
			suffix = "KB";
			size = Math.round(size / 1024 * 100) / 100;
		} else if (size >= 1024000) {
			suffix = "MB";
			size = Math.round(size / 1024000 * 100) / 100;
		}

		return `<li key="${index}">${
			file.name
		} <span class="file-size">${size} ${suffix}</span><i class="material-icons md-48">delete</i></li>`;
	});
	$("ul").html(fileMap);
}
