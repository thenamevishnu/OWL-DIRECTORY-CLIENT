import { marked } from 'marked';

export const AiResponse = ({ text }) => {
    return <div className='p-2'>
        <div dangerouslySetInnerHTML={{ __html: marked(text) }} className="backdrop-blur-xl w-full overflow-scroll scroll-none max-h-[600px] whitespace-pre-wrap bg-secondary/20 p-2"></div>
    </div>
}