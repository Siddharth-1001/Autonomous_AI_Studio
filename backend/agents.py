import logging
import os
import traceback

from autogen import AssistantAgent, UserProxyAgent
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.info(f"GEMINI_API_KEY present: {bool(os.getenv('GEMINI_API_KEY'))}")

config_list = [
    {
        "model": "gemini-2.5-flash",
        "api_key": os.getenv("GEMINI_API_KEY"),
        "api_type": "google",
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
    code_execution_config=False,  # Disable code execution
    human_input_mode="NEVER",  # Automated for now, can be ALWAYS for interactive
    max_consecutive_auto_reply=0,  # Stop after receiving the first response
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
    logger.info(f"run_analysis called with {len(posts_data)} posts")

    # Prepare the context
    posts_summary = "\n".join(
        [
            f"Type: {p['type']}, Reactions: {p['reactions']}, Content Snippet: {p['content'][:100]}..."
            for p in posts_data
        ]
    )
    logger.debug(f"Posts summary: {posts_summary[:500]}...")

    task_message = f"""
    Here is the data from the last {len(posts_data)} scraped LinkedIn posts:
    {posts_summary}
    
    Please analyze this performance and suggest future content.
    """

    try:
        logger.info("Starting agent chat...")
        # Start the chat
        chat_result = user_proxy.initiate_chat(
            analyst,
            message=task_message,
        )
        logger.info(f"Chat completed. Chat result type: {type(chat_result)}")
        logger.debug(f"Chat result: {chat_result}")

        # Try to get the last message
        last_msg = user_proxy.last_message(analyst)
        logger.info(f"Last message type: {type(last_msg)}")
        logger.debug(f"Last message: {last_msg}")

        if last_msg is None:
            logger.warning("last_message returned None, trying chat_history")
            # Fallback: try to get from chat history
            if hasattr(chat_result, "chat_history") and chat_result.chat_history:
                return chat_result.chat_history[-1].get(
                    "content", "No content in chat history"
                )
            elif hasattr(chat_result, "summary"):
                return chat_result.summary
            return "Analysis completed but no response captured"

        return last_msg.get("content", "No content in response")

    except Exception as e:
        logger.error(f"Error in agent chat: {e}")
        logger.error(traceback.format_exc())
        raise
