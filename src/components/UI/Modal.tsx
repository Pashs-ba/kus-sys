import {ReactNode} from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Modal({
                                  children,
                                  title,
                                  connected_with,
                                  additional_classes
                              }:
                                  {
                                      children?: ReactNode,
                                      title: string,
                                      connected_with: string,
                                      additional_classes?: string
                                  }
) {
    return (
        <div className={`modal fade ${additional_classes}`}
             id={connected_with}
             tabIndex={-1}
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}