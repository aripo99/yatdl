import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className='container'>
            <div className='flex flex-col space-y-14'>
                <header className='flex items-center justify-between py-4 border-b border-gray-100 dark:border-slate-800'>
                    <Link href='/'>
                        <b>Yet Another To Do List</b>
                    </Link>

                    <div>
                        <Button>
                            <Link href='/auth/sign-in'>
                                Sign In
                            </Link>
                        </Button>
                    </div>
                </header>

                <div className='flex flex-col space-y-8'>
                    <div className='flex justify-center'>
                        <span className='py-2 px-4 rounded-full shadow dark:shadow-gray-500 text-sm'>
                            An opinionated to do list
                        </span>
                    </div>

                    <h1 className='text-4xl lg:text-6xl 2xl:text-7xl font-semibold text-center max-w-4xl mx-auto'>
                        Yet Another To Do List
                    </h1>

                    <h2 className='text-center text-lg xl:text-2xl text-gray-400  font-light'>
                        <p>
                            YATDL is my opinionated to do list.
                        </p>

                        <p>
                            You only can see today&apos;s tasks, and each day you add tasks for tomorrow or throw them to the backlog.
                        </p>

                        <p>
                            Try it out, it&apos;s free.
                        </p>
                    </h2>
                </div>

                <div className='flex flex-col space-y-3'>
                    <div className='flex space-x-2 justify-center'>
                        <Button>
                            <Link href='/auth/sign-up'>
                                Create an Account
                            </Link>
                        </Button>

                        <Button variant={'ghost'}>
                            <Link href='/auth/sign-in'>
                                Sign In
                            </Link>
                        </Button>
                    </div>

                </div>

                <hr className='border-gray-100 dark:border-slate-800' />

                <div className='flex flex-col space-y-12'>
                    <div className='flex flex-col space-y-2'>
                        <h2 className='text-2xl font-semibold text-center'>
                            The best to-do list
                        </h2>

                        <h3 className='text-lg text-center text-gray-400'>
                            It is opinionated, but it works for me.
                        </h3>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
                        <div className='flex flex-col space-y-1'>
                            <h3 className='text-xl font-medium'>
                                1. Create an Account
                            </h3>

                            <div>
                                Create an Account to add your to dos.
                            </div>
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <h3 className='text-xl font-medium'>
                                2. Add to dos
                            </h3>

                            <div>
                                Add to dos for today, tomorrow or throw them to the backlog.
                            </div>
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <h3 className='text-xl font-medium'>
                                3. Destroy
                            </h3>

                            <div>
                                Start destroying your tasks
                            </div>
                        </div>
                    </div>
                </div>


                <hr className='border-gray-100 dark:border-slate-800' />

                <footer className='py-6'>
                    <div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 justify-between'>
                        <b>Yet Another To Do List</b>
                        <div>
                            The most opinionated to do list
                        </div>

                        <div className='flex space-x-4'>
                            <Button variant='link'>
                                <Link href='/auth/sign-in'>
                                    Sign In
                                </Link>
                            </Button>

                            <Button variant='link'>
                                <Link href='/auth/sign-up'>
                                    Create an Account
                                </Link>
                            </Button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
