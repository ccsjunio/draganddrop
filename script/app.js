(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
	
	gameBoard = document.querySelector('.puzzle-board'),
	dropZones = document.querySelectorAll('.drop-zone'),
	dropPuzzle = document.querySelectorAll('.puzzle-pieces img');

	const pieceNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet() {

		pieceNames.forEach((piece, index) =>{
			
			dropPuzzle[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
			dropPuzzle[index].id = `${piece + this.dataset.puzzleref}`;
		}); 

	gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;

	//debugger;
	}

	//allow to drag Puzzlepieces//
	function allowDrag(event) {
		console.log ('started dragging an image');
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
		event.target.appendChild(document.querySelector(`#${currentImage}`));
	}

	dropPuzzle.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	function resetPuzzlePieces() {
		debugger;
		//change the current puxxle, generate the pieces
		//clean out the puzzle pieces div
		dropPuzzle.innerHTML = "";

		//generate new pieces
		changeImageSet(this.dataset.puzzleref);

		for (var piece =0; piece< dropZones.length; piece++){
			dropZones[piece].innerHTML ="";
		}
	}

	puzzleButtons.forEach(button => button.addEventListener('click',changeImageSet));
	
	changeImageSet.call(puzzleButtons[0]);

})();
