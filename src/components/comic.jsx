const Comic = ({comic}) => <div>
  <h3>{comic["safe_title"]}</h3>
  <h4>Created date: </h4>
  <div>{comic.month}/{comic.day}/{comic.year}</div>
  <h4>View count: </h4>
  <div>{comic["view_count"]}</div>
  <h4>Scene description: </h4>
  {comic.parsedTranscript.sceneDescriptions.map((scene, index) => <p
    key={index}>{scene}</p>)}
  <h4>Dialogue: </h4>
  {comic.parsedTranscript.dialogues.map((dialogue, index) => <p
    key={index}>{dialogue.character}: {dialogue.dialogue}</p>)}
  <h4>Alt text: </h4>
  {comic.parsedTranscript.altText.map((alt, index) => <p key={index}>{alt}</p>)}
  <img src={comic.img} alt={comic.alt}/>
  <h4>Comic transcript: </h4>
  <pre>{comic.transcript}</pre>
</div>;

export default Comic;