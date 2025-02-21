import "./Modal.css";
import PropTypes from "prop-types"; 

export function Modal({ children, show, onClose}) {
  if (show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          {children}
          <button className="close" type="button" onClick={onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}

Modal.propTypes = { 
  children: PropTypes.node.isRequired, 
  show: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired
}