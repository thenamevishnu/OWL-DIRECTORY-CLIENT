import { marked } from 'marked';
import { memo } from 'react';

export const AiResponse = memo(({ text }) => {
    return <div className='p-2 backdrop-blur-xl w-full max-h-[600px] bg-secondary/20'>
        <div dangerouslySetInnerHTML={{ __html: marked(text) }} className="w-full max-h-[584px] overflow-scroll scroll-none whitespace-pre-wrap p-2"></div>
    </div>
})