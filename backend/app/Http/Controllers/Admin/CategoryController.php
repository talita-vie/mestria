<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CategoryResource;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct(
        private readonly AdminService $adminService
    ) {}


        public function index(): JsonResponse
    {
        $categories = $this->adminService->getAllCategories();
        
        return CategoryResource::collection($categories)->response()->setStatusCode(200);
    }

        public function show(Category $category): JsonResponse
    {
        return response()->json(new CategoryResource($category), 200);
    }
 
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->adminService->createCategory($request->validated());

        return response()->json([
            'message' => 'Categoria criada com sucesso.',
            'category'    => new CategoryResource($category),
            ], 201);
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $updatedCategory = $this->adminService->updateCategory($category, $request->validated());

        return response()->json([
            'message' => 'Categoria modificada com sucesso.',
            'category'    => new CategoryResource($updatedCategory),
            ], 200);
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete(); 
        
        return response()->json(['message' => 'Categoria desativada com sucesso.'], 200);
    }
}
