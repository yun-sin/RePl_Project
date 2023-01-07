import React, { memo , useEffect} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalInside = styled.div`
    /* background-color: pink; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;


`

const InterestModal = memo(({IMDIsOpen, onRequestClose}) => {

    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = "";
          window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
      }, []);


    return (
        <Modal
            isOpen={IMDIsOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                  backgroundColor: "rgba(50, 50, 50, 0.75)",
                  zIndex: 99999,
                },
                content: {
                  backgroundColor: "#F8F8F8",
                  width: "820px",
                  maxHeight: "1000px",
                  height: "400px",
                  borderRadius: "15px",
                  margin: "auto",
                  overflowY: "hidden",
                  overscrollBehavior: "contain",
                },
            }}
        >
            <ModalInside>
                
            </ModalInside>

        </Modal>
    );
});

export default InterestModal;