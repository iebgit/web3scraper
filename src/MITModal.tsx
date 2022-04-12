import React, { useState } from "react";
import {
  CloseButton,
  Modal,
} from "react-bootstrap";

interface IProps {
  color: any;
  time: Date;
}

export default function MITModal({ color, time }: IProps) {
  const [centredModal, setCentredModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [qrTitle, setQrTitle] = useState("test");

  const toggleShow = () => setCentredModal(!centredModal);

  const copyText = (text:string) => {
    /* Copy text into clipboard */
    navigator.clipboard.writeText(text);
    setQrTitle("another test");
  };

  return (
    <>
      <a onClick={toggleShow}>
        
        <strong
          title="View License Information"
        >
          MIT License &copy; {time.getFullYear()}
        </strong>
      </a>

      <Modal className={`text-${color}`} tabIndex="-1" show={centredModal} onHide={() => setCentredModal(false)} >
        
     
        <Modal.Header className={`bg-dark`}>
        <Modal.Title >
        MIT License &copy; {time.getFullYear()} Web3 Domain
        </Modal.Title>
         <CloseButton variant='white' onClick={() => setCentredModal(false)}></CloseButton>
        </Modal.Header>
        <Modal.Body className={`bg-dark`}>
        <p >
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p><p>

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</p><p>

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</p>
        </Modal.Body>

       
                  
      </Modal>
    </>
  );
}
