 export function InstructorCard({instructor}) {
    if (!instructor) return null;
    return (
 
 <div className="flex items-center gap-3 mt-2 pt-4 border-t border-white/10">
                {instructor.avatar ? (
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-label-md font-semibold text-white truncate">
                    {instructor.name}
                  </p>
                  <p className="text-label-sm text-white/50 truncate">
                    {instructor.role ?? "Instrutor"}
                  </p>
                </div>
              </div>

)}