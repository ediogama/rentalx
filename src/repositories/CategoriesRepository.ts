import { Category } from "../model/Category";

interface ICategoryRepository {
    name: string;
    description: string;
}
class CategoriesRepository {
    private categories: Category[];

    constructor(){
        this.categories = [];
    }

    create({ name, description }: ICategoryRepository) {
        const category = new Category();

        Object.assign(category, {
            name,
            description, 
            created_at: new Date()
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string) {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}

export { CategoriesRepository }