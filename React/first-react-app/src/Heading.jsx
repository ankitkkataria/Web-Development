export default function Heading({color = 'olive', text = 'text', fontSize = '32px'}){
    return <h1 style={{color: color, fontSize: fontSize}}>{text}</h1>
}