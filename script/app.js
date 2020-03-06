(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
	
	gameBoard = document.querySelector('.puzzle-board'),
	dropZones = document.querySelectorAll('.drop-zone'),
	dropPuzzle = document.querySelectorAll('.puzzle-pieces img');

	const pieceNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet() {

		document.querySelectorAll(".puzzle-board .drop-zone").forEach((element)=>element.innerHTML="");
		
		
		let imagePieces = document.querySelectorAll("img.puzzle-image");
		if(imagePieces.length<4){
			imagePieces.forEach((element)=>element.parentNode.removeChild(element));
		}

		pieceNames.forEach((piece, index) =>{
			if(imagePieces.length<4){
				let sourceZone = document.querySelector(".puzzle-pieces");
				let imgElement = document.createElement("img");
				imgElement.src = `images/${piece + this.dataset.puzzleref}.jpg`;;
				imgElement.id = `${piece + this.dataset.puzzleref}`;
				imgElement.setAttribute("alt","top left");
				imgElement.classList.add("puzzle-image");
				sourceZone.appendChild(imgElement);
			} else {
				imagePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
				imagePieces[index].id = `${piece + this.dataset.puzzleref}`;
			}	
		}); 

		addAllListeners();

		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;

	//debugger;
	}

	//allow to drag Puzzlepieces//
	function allowDrag(event) {
		console.log ('started dragging an image');
		console.log("id of image = ", this.id);
		event.dataTransfer.setData("text/plain", this.id);
	}

	//allow drag over the a drop zone//
	function allowDragOver(event) {
		event.preventDefault();
		console.log ('dragged over a drop zone');
	}

	//allow drop into exect drop zone//
	function allowDrop(event) {
		console.log ('dropping in a drop zone');
		let currentImage = event.dataTransfer.getData("text/plain");
		console.log("currentImage = ", currentImage);
		event.target.appendChild(document.querySelector(`#${currentImage}`));
	}

	function addAllListeners(){
		let dropPuzzle = document.querySelectorAll('.puzzle-pieces img');
		dropPuzzle.forEach(piece => piece.addEventListener('dragstart', allowDrag));

		dropZones.forEach(zone => {
			zone.addEventListener('dragover', allowDragOver);
			zone.addEventListener('drop', allowDrop);
		});
	}
	

	puzzleButtons.forEach(button => button.addEventListener('click',changeImageSet));
	
	changeImageSet.call(puzzleButtons[0]);

})();
