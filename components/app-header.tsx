import ProfileDropdown from './profile-dropdown';

function AppHeader() {
    return (
        <div className="space-y-0.5 flex flex-row justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">YATDL</h2>
                <p className="text-muted-foreground">
                    Yet Another To Do List
                </p>
            </div>
            <ProfileDropdown />
        </div>
    )
}

export default AppHeader;