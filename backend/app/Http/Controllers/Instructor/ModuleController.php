<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Resources\Instructor\ModuleResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Module\StoreModuleRequest;
use App\Http\Requests\Module\UpdateModuleRequest;
use App\Models\Course;
use App\Models\Module;
use App\Services\ModuleService;
use Illuminate\Http\JsonResponse;

class ModuleController extends Controller
{
     public function __construct(
        private readonly ModuleService $moduleService
    ) {}

   public function store(StoreModuleRequest $request, Course $course): JsonResponse
    {
        $this->authorize('update', $course);

        $module = $this->moduleService->createModule($course, $request->validated());

        return response()->json([
            'message' => 'Módulo criado com sucesso.',
            'module' => new ModuleResource($module)
        ], 201);
    }

    public function show(Module $module): JsonResponse
    {
        $this->authorize('view', $module);
        
        $module = $this->moduleService->loadAuthorizedLessons($module, auth()->user());

        return response()->json(new ModuleResource($module));
    }

    public function update(UpdateModuleRequest $request, Module $module): JsonResponse
    {
        $this->authorize('update', $module);

        $updatedModule = $this->moduleService->updateModule($module, $request->validated());

        return response()->json([
            'message' => 'Módulo atualizado com sucesso.',
            'module' => new ModuleResource($updatedModule)
        ]);
    }

    public function destroy(Module $module): JsonResponse
    {
        $this->authorize('delete', $module);
        
        $this->moduleService->deleteModule($module);
        
        return response()->json(['message' => 'Módulo removido com sucesso.']);
    }

     public function reorder(Request $request, Course $course): JsonResponse
    {
        $this->authorize('update', $course);
 
        $request->validate([
            'modules'          => ['required', 'array'],
            'modules.*.id'     => ['required', 'integer', 'exists:modules,id'],
            'modules.*.position'  => ['required', 'integer', 'min:1'],
        ]);
 
        $this->moduleService->reorderModules($course, $request->input('modules'));
 
        return response()->json(['message' => 'Módulos reordenados com sucesso.']);
    }
}

