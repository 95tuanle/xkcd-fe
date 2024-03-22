import {useCallback, useContext, useEffect, useState} from "react";
import ApiContext from "../contexts/api-context";

const Body = () => {
  const apiUrl = useContext(ApiContext);
  const [comic, setComic] = useState(null);
  const [latest, setLatest] = useState(0);
  const [error, setError] = useState(null);

  const fetchComic = useCallback(async (endpoint) => {
    setComic(null);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/xkcd/${endpoint}`);
      const data = await response.json();
      data.transcript = parseComicStrip(data.transcript);
      setComic(data);
      if (endpoint === 'latest') {
        setLatest(data.num);
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching comic');
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchComic('latest').then(() => {
    });
    // const getComic = async () => {
    //   try {
    //     const response = await fetch(`${apiUrl}/xkcd/latest`);
    //     const data = await response.json();
    //     setLatest(data.num);
    //     setComic(data);
    //   } catch (err) {
    //     console.error(err);
    //     alert('Error fetching comic')
    //   }
    // };
    // getComic().then(() => {
    // });
  }, [fetchComic]);

  // function showFirstComic() {
  //   setComic(null);
  //   fetch(`${apiUrl}/xkcd/num/${1}`)
  //     .then(response => response.json())
  //     .then(data => setComic(data))
  //     .catch(err => {
  //       console.error(err);
  //       alert('Error fetching comic')
  //     });
  // }
  //
  // function showPreviousComic() {
  //   if (comic.num > 1) {
  //     setComic(null);
  //     fetch(`${apiUrl}/xkcd/num/${comic.num - 1}`)
  //       .then(response => response.json())
  //       .then(data => setComic(data))
  //       .catch(err => {
  //         console.error(err);
  //         alert('Error fetching comic')
  //       });
  //   } else {
  //     alert('No previous comic');
  //   }
  // }
  //
  // function showRandomComic() {
  //   setComic(null);
  //   fetch(`${apiUrl}/xkcd/random`)
  //     .then(response => response.json())
  //     .then(data => setComic(data))
  //     .catch(err => {
  //       console.error(err);
  //       alert('Error fetching comic')
  //     });
  // }
  //
  // function showNextComic() {
  //   if (comic.num < latest) {
  //     setComic(null);
  //     fetch(`${apiUrl}/xkcd/num/${comic.num + 1}`)
  //       .then(response => response.json())
  //       .then(data => setComic(data))
  //       .catch(err => {
  //         console.error(err);
  //         alert('Error fetching comic')
  //       });
  //   } else {
  //     alert('No next comic');
  //   }
  // }
  //
  // function showLastComic() {
  //   setComic(null);
  //   fetch(`${apiUrl}/xkcd/latest`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setComic(data)
  //       setLatest(data.num)
  //     })
  //     .catch(err => {
  //       alert('Error fetching comic')
  //       console.error(err);
  //     });
  // }

  const showFirstComic = () => fetchComic('num/1');
  const showPreviousComic = () => comic.num > 1 ? fetchComic(`num/${comic.num - 1}`) : setError('No previous comic')
  const showRandomComic = () => fetchComic('random');
  const showNextComic = () => comic.num < latest ? fetchComic(`num/${comic.num + 1}`) : setError('No next comic')
  const showLastComic = () => fetchComic('latest');

  return <>
    <button onClick={showFirstComic}>First</button>
    <button onClick={showPreviousComic}>Previous</button>
    <button onClick={showRandomComic}>Random</button>
    <button onClick={showNextComic}>Next</button>
    <button onClick={showLastComic}>Last</button>
    {error && <span>{error}</span>}
    {comic ? <div>
      <h3>{comic["safe_title"]}</h3>
      <h4>Created date: </h4>
      <div>{comic.month}/{comic.day}/{comic.year}</div>
      <h4>View count: </h4>
      <div>{comic["view_count"]}</div>
      <h4>Scene description: </h4>
      {comic.transcript.sceneDescriptions.map((scene, index) => <p
        key={index}>{scene}</p>)}
      <h4>Dialogue: </h4>
      {comic.transcript.dialogues.map((dialogue, index) => <p
        key={index}>{dialogue.character}: {dialogue.dialogue}</p>)}
      <h4>Alt text: </h4>
      {comic.transcript.altText.map((alt, index) => <p key={index}>{alt}</p>)}
      <img src={comic.img} alt={comic.alt}/>
    </div> : <p>Loading...</p>}
  </>;
}

const parseComicStrip = (comicStrip) => {

  const sceneDescriptionPattern = /\[\[(.*?)]]/g;
  const dialoguePattern = /(.*?): (.*?)\n/g;
  const altTextPattern = /\{\{(.*?)}}/g;

  const sceneDescriptions = [...comicStrip.matchAll(sceneDescriptionPattern)].map(match => match[1]);
  const dialogues = [...comicStrip.matchAll(dialoguePattern)].map(match => ({character: match[1], dialogue: match[2]}));
  const altText = [...comicStrip.matchAll(altTextPattern)].map(match => match[1]);

  return {
    sceneDescriptions, dialogues, altText
  };
};

export default Body;