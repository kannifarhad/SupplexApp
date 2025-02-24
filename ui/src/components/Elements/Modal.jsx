import Button from "./Button";

function Modal({ title, children, ...rest }) {

    return (
        <div className="modal" role="dialog" style={{ display: "block", background: "rgba(0,0,0,.5)" }}>
            <div 
                className="modalBg" 
                style={{
                    'position':'absolute', 
                    'width':'100%',
                    'height':'100%',
                }} 
                onClick={() => rest.handlerCloseModal()}
            ></div>

            <div className="modal-dialog" role="document" style={{ maxWidth: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                        <Button
                            title={<span aria-hidden="true">&times;</span>}
                            className="close"
                            color="btn-outline-dark"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => rest.handlerCloseModal()}
                        />
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>

                    <div className="modal-footer">
                        <Button
                            title="Close"
                            className="close"
                            color="btn-secondary"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => rest.handlerCloseModal()}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;