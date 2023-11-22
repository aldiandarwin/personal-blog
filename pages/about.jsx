import React from 'react';
import PageTitle from '@/components/PageTitle';
import MyPictureWithSocial from '@/components/MyPictureWithSocial';
import Container from '@/components/Container';
import styles from '@/components/styles';
import Meta from '@/components/Meta';
export default function About() {
    return (
        <>
            <Meta
                title='About / Darwin Notes'
                url='https://aldian-darwin-site.webflow.io/'
            />
            <div className={styles.whiteLayoutWithPaddingY}>
                <Container>
                    <div className='flex flex-col-reverse gap-10 lg:flex-row'>
                        <div className='w-full lg:w-2/3'>
                            <PageTitle className='mb-6'>
                                introduction my name is aldian .<br></br>
                                we live in Bandung Indonesia, where we build a
                                class in BWA.
                            </PageTitle>
                            <section className='prose dark:prose-invert lg:prose-lg'>
                                <p>
                                    There are so many questions where I
                                    currently work, from 2022 to February 2024 I
                                    have worked in several Agency engaged in
                                    Software Agency and Software House.
                                </p>
                                <p>
                                    I also had time to teach offline, but it had
                                    been a long time since Pandemic Covid 19. I
                                    starting teach online too March 1, 2023, I
                                    have decided that I will no longer work
                                    anywhere but focus on BWA and then seriously
                                    make the work, whether it be in the form of
                                    writing or video courses.
                                </p>
                                <p>
                                    My current routine has 3 things, making some
                                    Market Research , writing articles, and
                                    learning And if you want to talk about your
                                    current job, or want to talk about coding,
                                    and even life. You can directly dm me on
                                    twitter, because I myself have lived long
                                    enough in the midst of a company that
                                    especially operates in the software.
                                </p>
                                <p>
                                    Sorry if you ever dm me on Instagram and
                                    maybe the reply might take too long or even
                                    no reply. It's just because I'm not really
                                    active there. But if you dm me via twitter,
                                    hopefully I'll reply right away. Because I'm
                                    always online there.
                                </p>
                            </section>
                        </div>
                        <div className='w-full lg:w-1/3'>
                            <MyPictureWithSocial />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
