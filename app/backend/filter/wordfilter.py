def filter(prompt):  
    #prompt = "디스플레이 패널 구동을 위한 OLED용 DDI(Display Driver IC) 설계기술"
    forbidden_list = ['30나노','이하급','D램에','해당되는','설계·공정·소자기술','및','3차원','적층형성', 'D램에','해당되는','적층조립기술','및','검사기술', '30나노','이하급','또는','적층','3D','낸드플래시에','해당되는','설계·공정·소자', '낸드플래시에','해당되는','적층조립기술','및','검사기술', '30나노급','이하','파운드리에','해당되는','공정·소자기술','및','3차원','적층형성', '모바일','Application','Processor','SoC','설계·공정기술', 'LTE','LTE_adv', '5G','Baseband','Modem','설계기술', '대구경', '300mm','반도체','웨이퍼','제조를','위한','단결정','성장', '픽셀','1㎛','이하','이미지센서','설계·공정·소자', '시스템반도체용','첨단','패키지','FO-WLP','FO-PLP','FO-PoP','조립·검사', '디스플레이','패널','구동을','위한','OLED용','DDI', 'Display','Driver','IC','설계기술','기술']
    
    result = False
    result_word = ""
    
    for f_word in forbidden_list:
        #print(f_word)
        if f_word in prompt:
            print(prompt)
            result = True
            result_word = f_word
            break
    
    return result, result_word