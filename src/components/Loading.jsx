
const Loading = () => {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-primary border-t-transparent">
          <div className="h-8 w-8 rounded-full bg-primary"/>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
