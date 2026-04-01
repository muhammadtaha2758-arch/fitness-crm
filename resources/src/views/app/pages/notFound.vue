<template>
    <div class="not-found-page">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center">
                    <div class="not-found-content">
                        <div class="error-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <h1 class="error-code">404</h1>
                        <h2 class="error-title">oops</h2>
                        <p class="error-message">couldNotFind</p>
                        <div class="error-actions">
                            <button @click="goHome" class="btn btn-primary">
                                <i class="fas fa-home mr-2"></i>
                                ReturnDashboard
                            </button>
                            <button @click="goBack" class="btn btn-outline-secondary ml-2">
                                <i class="fas fa-arrow-left mr-2"></i>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goHome() {
            this.$router.push('/app/dashboard');
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.not-found-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px 0;
}

.not-found-content {
    background: white;
    padding: 60px 40px;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.error-icon {
    font-size: 4rem;
    color: #ff4040;
    margin-bottom: 20px;
}

.error-code {
    font-size: 6rem;
    font-weight: bold;
    color: #333;
    margin: 0;
    line-height: 1;
}

.error-title {
    font-size: 2rem;
    color: #666;
    margin: 20px 0;
    font-weight: 600;
}

.error-message {
    font-size: 1.1rem;
    color: #888;
    margin-bottom: 40px;
    line-height: 1.6;
}

.error-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #ff4040;
    border-color: #ff4040;
    color: white;
}

.btn-primary:hover {
    background-color: #e63939;
    border-color: #e63939;
    transform: translateY(-2px);
}

.btn-outline-secondary {
    border-color: #6c757d;
    color: #6c757d;
}

.btn-outline-secondary:hover {
    background-color: #6c757d;
    color: white;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .not-found-content {
        padding: 40px 20px;
    }
    
    .error-code {
        font-size: 4rem;
    }
    
    .error-title {
        font-size: 1.5rem;
    }
    
    .error-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 200px;
    }
}
</style>