import React from "react";

function Modal({ setModal }) {
  return (
    <div >
        
     <form>
       <div class="mb-3">
        <input type="text" class="form-control" placeholder="Add a comment" />
        <button> Add comment</button>
     </div>
     </form>
    </div>
  );
}

export default Modal;