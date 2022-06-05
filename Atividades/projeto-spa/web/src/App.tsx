interface ButtonProps {
  text?: string;
}

function Button(props: ButtonProps) {
  return <button className=" bg-red-600 p-4 h-10 rounded text-black hover:bg-red-700 transition-colors">{props.text ?? 'Default'}</button>
}

function App() {
  return  (
    <div className="flex gap-2">
      <Button text="O Botão"/>
      <Button text="O outro botão"/>
      <Button text="Mais um botão"/>
      <Button text="Mestre da web"/>
    </div>
  )
}

export default App