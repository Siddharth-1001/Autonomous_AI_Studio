import os
from autogen import AssistantAgent, UserProxyAgent
from dotenv import load_dotenv

load_dotenv()

config_list = [
    {
        "model": "gpt-4-turbo", # Or whichever model user prefers/has access to via env
        "api_key": os.getenv("OPENAI_API_KEY"),
    }
]

llm_config = {
    "config_list": config_list,
    "temperature": 0.7,
}

# 1. User Proxy (The 'Admin')
user_proxy = UserProxyAgent(
    name="Admin",
    system_message="A human admin. Interact with the planner to discuss the plan. Plan execution needs to be approved by this admin.",
    code_execution_config={"work_dir": "coding", "use_docker": False},
    human_input_mode="NEVER",  # Automated for now, can be ALWAYS for interactive
)

# 2. Analysis Agent
analyst = AssistantAgent(
    name="Analyst",
    llm_config=llm_config,
    system_message="""You are an expert Social Media Analyst. 
    Your job is to analyze LinkedIn post metrics (reactions, comments, type) and provide deep insights on:
    - What type of content works best?
    - Engagement trends.
    - actionable improvement tips.
    Output clear, bulleted insights.""",
)

# 3. Content Strategist Agent
trend_spotter = AssistantAgent(
    name="TrendSpotter",
    llm_config=llm_config,
    system_message="""You are a Creative Content Strategist.
    Based on the analyst's insights and current trends (which you simulate or are provided), 
    generate 3-5 high-potential content ideas for the next week.
    Focus on:
    - Hook structures.
    - Topics aligned with high-performing past posts.
    """,
)

def run_analysis(posts_data):
    """
    Trigger the multi-agent conversation based on scraped data.
    """
    # Prepare the context
    posts_summary = "\n".join([f"Type: {p['type']}, Reactions: {p['reactions']}, Content Snippet: {p['content'][:100]}..." for p in posts_data])
    
    task_message = f"""
    Here is the data from the last {len(posts_data)} scraped LinkedIn posts:
    {posts_summary}
    
    Please analyze this performance and suggest future content.
    """
    
    # Start the chat
    user_proxy.initiate_chat(
        analyst,
        message=task_message,
    )
    
    # We ideally want to capture the output, usually done via chat history
    # For MVP, we'll return the last message content
    return user_proxy.last_message()["content"]
