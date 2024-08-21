import { baseUrl } from "../project"
import { ButtonOverride as Button } from '@/components/Buttons/ButtonOverride';

export const notFoundImg = '/images/default/chewy.gif'

export type NotFoundSettings = {
    imgUrl: string
    title: string
    description: React.ReactNode
}

export const notFoundSettings: NotFoundSettings = {
    imgUrl: '/images/logo.png',
    title: '404 - Page Not Found!',
    description: (
        <>
            <div className='flex content-center align-middle p-4'>
                The page you are looking for does not exist. Please check the URL and
                try again. If you believe this is an error, please contact the site
                administrator
            </div>
            <div className='align-middle'>
                <a href="../">
                    <Button size='md' variant='shadow' color='secondary' className="mb-2">
                        Return Home!
                    </Button>
                </a>{' '}
            </div>
        </>
    )
}
