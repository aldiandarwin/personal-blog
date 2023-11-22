export default function Youtube({ id }) {
    return (
        <div className='relative h-0 w-full max-w-full overflow-hidden rounded-xl pb-[56.25%]'>
            <iframe
                src={`https://www.youtube.com/channel/UCzOj1Tp1cm1wdfwYhLxBMHQ/${id}`}
                allow='autoplay; encrypted-media'
                title='Embedded YouTube video'
                className='absolute top-0 left-0 h-full w-full border-0'
            />
        </div>
    );
}
