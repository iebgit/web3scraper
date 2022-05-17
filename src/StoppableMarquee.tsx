import React, { useState } from "react";
import MetaButton from './MetaButton';
import { Col, Row, Offcanvas, ListGroup, Container, Navbar } from "react-bootstrap";
import Ticker from "react-ticker";
import './MetaButton.css';
import './App.css';
import play from "./img/play.png";
import pause from "./img/pause.png";
import logo from "./img/logo.png"
// (window as any).ethereum also allows typescript to ignore the child types
declare let window: any;
interface IProps {
  news: any,
  color: any,
  network: any,
  networks: any
}

function StoppableMarquee({news, color, network, networks }: IProps) {
  let [move, setMove] = useState(true)
  let [playIcon, setPlayIcon] = useState(pause)
  let [currentIndex, setCurrentIndex] = useState(0)
  let [url, setUrl] = useState(news[0].url)
  let [article, setArticle] = useState(news[0].article[0])
  let [source, setSource] = useState(news[0].source)
  // let [subheading, setSubheading] = useState(news[0].article[0].subheading)
  let [published, setPublished] = useState(news[0].article[0].published)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const moveBanner = () => {
    if (move) {
      setMove(false);
      setPlayIcon(play);
    } else {
      setMove(true);
      setPlayIcon(pause);
    }
  }

  const hoverBanner = () => {
    if (playIcon === pause) {
      setMove(true)
    } else {
      setMove(false)
    }
  }
  const indexCheck = (current: number, index: number) => {
    console.log(`Iterations: ${index}`)
    console.log(`Current Index: ${current} of ${news.length - 1}`)
    if (current === news.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(current + 1)
    }
  }
  const displayArticle = (url: string) => {
    
    for (let x = 0; x < news.length; x++) {
      if (url === news[x].url) {
        setArticle(news[x].article[0])
        setSource(news[x].source)
        setUrl(news[x].url)
        ////commented out because coindesk seems to have articles without the h2 tag
        // setSubheading(news[x].article[0].subheading)
              
          setPublished(news[x].article[0].published)
     

        console.log(news[x])
      }
      window.scrollTo({top: 0, behavior: 'smooth'});

    }
    
  }
  return (
    <div>
      <Navbar sticky="top" variant="dark" className='App-banner bg-color'>
     

<Col className=''
  xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}
>
  <img
    title="View all news stories"
    className='App-banner-img App-pointer'
    src={logo}
    onClick={handleShow}
    alt='offCanvas'
  >

  </img>

  <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header className='App-offcanvas' closeButton closeVariant="white">
      <Offcanvas.Title>
        <img
          title="Web3 Scraper"
          className='App-banner-img'
          src={logo}
          alt='Logo'
        >
        </img>

      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body className='App-offcanvas' >
      <ListGroup as="ol" numbered>
        {news.map((t: any, index: number) =>
          <ListGroup.Item key={`${t.title}-${index}`} as='li' action variant={color} className='App-pointer p1' onClick={() => displayArticle(t.url)}>{t.title}</ListGroup.Item>
        )}
      </ListGroup>

    </Offcanvas.Body>
  </Offcanvas>

</Col>
<Col className='App-inv-col'
  xs={6} sm={6} md={6}
></Col>

<Col
  className='ticker-col'
  xs={8} sm={8} md={6} lg={6} xl={7} xxl={7}
  onMouseEnter={() => setMove(false)}
  onMouseLeave={() => {
    hoverBanner();
  }}
>
<Ticker speed={8} move={move}>
    {({ index }) => (
      <>{indexCheck(currentIndex, index)}
        <p className="App-color-white App-margin-top1" key={`${news[currentIndex].title}-${index}`}>
          &nbsp;&nbsp;&nbsp;&nbsp;♦&nbsp;&nbsp;&nbsp;&nbsp;
          <strong
            className={`text-${color} p1 App-link`}
            title={news[currentIndex].source}
            onClick={() => displayArticle(news[currentIndex].url)}
          >{`${news[currentIndex].title}`}</strong>
        </p>
      </>
    )}
  </Ticker>

  
</Col>
<Col className="App-play-col ticker-col" xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
  <img
    className={`bg-${color} App-pointer App-play-img img1`}
    src={playIcon}
    onClick={moveBanner}
    alt='play/pause'
  ></img>
</Col>
<Col
  xs={3} sm={3} md={3} lg={3} xl={2} xxl={2}
>
  <MetaButton network={network} networks={networks} ></MetaButton>
</Col>

      </Navbar>
      
      <br />
      <Container >
      <Row>
        <Col xs={12} sm={12} md={8} lg={9} xl={9} xxl={9} >
          <div className="padded border0">
          <strong className={`text-${color} App-link p1`} onClick={(e) => {
            e.preventDefault();
            window.open(url, "_blank");
          }} title={`link to ${source}`}>{source}</strong>
          <br />
          <h2 className={`text-${color} p1`}><strong>{article.headline}</strong></h2>
       
          <div>
            <strong className={`text-${color} p1`}>
              {published}
            </strong>
          </div>
          <br/>
          <div>
          <img src={article.image.src} alt={source} className="image-sizing"></img>
          </div>
          <br />
          {article.paragraph.map((data: any, index: number) =>
            <p key={index} className={`App-align-left text-light p1`}>{data}</p>)}
          </div>
          <br/>
        </Col>
        
        <Col xs={12} sm={12} md={4} lg={3} xl={3} xxl={3} className='App-align-left'>
       
          <ListGroup as="ol" numbered>
                {news.slice(0,10).map((t: any, index: number) =>
                
                  <ListGroup.Item key={index} as='li' action variant={color} className={`App-pointer p1`} onClick={() => displayArticle(t.url)}>
                   
                <img key={index} src={t.article[0].image.src} alt={source} className="image-sizing"></img>
               
                   <div><strong className={`p1`}>{t.title}</strong></div> </ListGroup.Item>
                )}
          </ListGroup>
        
        </Col>
      </Row>
      </Container>
      

    </div>
  );
}

export default StoppableMarquee;
