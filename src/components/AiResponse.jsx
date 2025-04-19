import { marked } from 'marked';
import { memo } from 'react';

export const AiResponse = memo(({ text }) => {
    return <div className='p-2 w-full max-h-[600px] bg-secondary rounded'>
        <div dangerouslySetInnerHTML={{ __html: marked(text) }} className="w-full max-h-[584px] overflow-scroll scroll-none whitespace-pre-wrap"></div>
    </div>
})